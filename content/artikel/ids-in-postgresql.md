---
title: 'Primärschlüssel und externe IDs in PostgreSQL'
published: 2026-11-10
topics:
  - Datenbanken
  - PostgreSQL
---

## Problemstellung

Web-Frontend-Frameworks benötigen für einzelne Elemente häufig eine eindeutige und stabile ID, wenn diese in Listen dargestellt werden sollen. Häufig kommt hier ein `key`-Attribut zum Einsatz. Diese ID ist dabei grob mit einem Primärschlüssel aus einer Datenbanktabelle vergleichbar, denn beide identifizieren eindeutig eine Entität. Und wenn Requests an das Backend gesendet werden, die dieses anweisen, einen Datensatz zu aktualisieren oder zu löschen, wird ebenfalls eine ID benötigt, damit das Backend weiß, um welchen Datensatz es sich handelt.

Primärschlüssel eignen sich aber nicht immer dafür, da sie unter Umständen sensible Informationen verraten können. Je nach Einsatzzweck kommen verschiedene Methoden zum Einsatz, um Datensätze auf sichere Art und Weise identifizierbar zu machen.

## Verwendbare Datentypen

Es gibt bei PostgreSQL mehrere Datentypen, die sich als Primärschlüssel eignen. Dazu zählen vor allem `BIGINT` und `UUID`. Beim Typ `UUID` sind vor allem _UUIDv4_ und _UUIDv7_ interessant.

Aufgrund der Art und Weise wie PostgreSQL Primärschlüssel verwaltet, ist es aus Sicht der Performance ratsam _UUIDv7_ statt _UUIDv4_ als solchen zu verwenden. _UUIDv7_ erzeugt grob chronologisch aufsteigende UUIDs, während _UUIDv4_ immer vollständig zufällige UUIDs generiert. Das Einsortieren einer UUID im Index der Datenbank kann daher bei _UUIDv4_ mehr Zeit beanspruchen als bei _UUIDv7_.

Eine _UUIDv4_ ist dagegen eher für externe IDs interessant. Aber dazu weiter unten mehr.

## Variante 1: Nur ein Primärschlüssel

Wenn der Zeitpunkt, an dem ein Datensatz erstellt wurde, keine geheime Information darstellt (z. B. bei Blog-Artikeln, Social Media-Beiträgen usw.), kann für den Primärschlüssel einfach eine _UUIDv7_ erzeugt werden und dieser auch nach außen ans Frontend gegeben werden.

Anhand einer _UUIDv7_ kann man zwar grob die Reihenfolge mehrere Entitäten ableiten, aber die Gesamtanzahl dieser Entitäten bleibt weiterhin geheim.

Das `CREATE TABLE`-Statement kann dann folgendermaßen aussehen:

```sql "UUID" "uuidv7()"
CREATE TABLE "posts" {
	"id" UUID PRIMARY KEY DEFAULT uuidv7(),
	-- weitere Spalten
}
```

Die `id` wird von der Datenbank verwendet, um bspw. Tabellen mittels `JOIN` miteinander zu verknüpfen, kann aber auch die Datenbank verlassen und so in Backend- sowie Frontend-Code zur Identifizierung von Datensätzen verwendet werden.

## Variante 2: Separate interne und externe IDs

Ein Primärschlüssel vom Typ `BIGINT` oder eine _UUIDv7_ kann sensible Informationen enthalten. Ein `BIGINT`-Primärschlüssel verrät z. B. wie viele Entitäten es ungefähr in der Datenbank gibt. Aus `BIGINT` oder einer _UUIDv7_ lassen sich außerdem die Reihenfolge ableiten, in der Entitäten erzeugt wurden. Wenn in der Datenbank Kunden oder Bestellungen gespeichert werden, sollte man es daher vermeiden, die Information nach außen gelangen zu lassen.

In diesem Falle kann man neben der internen ID eine zweite externe ID erzeugen, die eben keine sensiblen Informationen mehr ableitbar macht. Dazu eignet sich eine _UUIDv4_ hervorragend, da diese vollständig zufällig erzeugt wird. Als interne ID reicht dann `BIGINT` vollständig aus.

Das `CREATE TABLE`-Statement kann dann folgendermaßen aussehen:

```sql "BIGINT" "GENERATED ALWAYS AS IDENTITY" "UUID" "uuidv4()"
CREATE TABLE "users" {
	"id" BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"external_id" UUID UNIQUE DEFAULT uuidv4(),
	-- weitere Spalten
}
```

Hier wird `id` nur von der Datenbank verwendet, um bspw. Tabellen mittels `JOIN` miteinander zu verknüpfen. Die `id` verlässt die Datenbank niemals. Die `external_id` dagegen kann die Datenbank problemlos verlassen und zur Identifizierung von Datensätzen im Backend sowie im Frontend verwendet werden.

## Weiterführende Links

- [`CREATE TABLE`](https://www.postgresql.org/docs/current/sql-createtable.html)
  - [`GENERATED ALWAYS AS IDENTITY`](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-PARMS-GENERATED-IDENTITY)
- [Numerische Datentypen](https://www.postgresql.org/docs/current/datatype-numeric.html)
- [`UUID`-Datentyp](https://www.postgresql.org/docs/current/datatype-uuid.html)
- [UUID functions](https://www.postgresql.org/docs/current/functions-uuid.html)
