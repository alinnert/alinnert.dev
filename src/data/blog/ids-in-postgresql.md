---
title: 'Geeignete Typen für Primärschlüssel in PostgreSQL'
published: 2026-02-23
topics:
  - Datenbanken
  - PostgreSQL
---

Web-Frontend-Frameworks benötigen für einzelne Elemente häufig eine eindeutige und stabile ID, wenn diese in Listen dargestellt werden sollen. Grundsätzlich entspricht das dem Primärschlüssel einer Datenbanktabelle.

Es gibt bei PostgreSQL mehrere Datentypen, die sich als Primärschlüssel eignen. Darunter vor allem `BIGINT` und `UUID`.

:::info{.warning}
Aufgrund der Art, wie PostgreSQL Primärschlüssel verwaltet, ist es aus Sicht der Performance ratsam UUIDv7 statt UUIDv4 zu verwenden. UUIDv7 erzeugt nämlich grob chronologisch aufsteigende UUIDs, während UUIDv4 immer vollständig zufällig sind. Das Einsortieren von UUIDv4 im Index der Datenbank kann mehr Zeit beanspruchen.
:::

Die Verwendung von `BIGINT` oder UUIDv7 als Primärschlüssel **und** externe ID kann aber unter Umständen problematisch sein, da so interne Informationen veröffentlicht werden, die intern bleiben sollen. Eine ID vom Typ `BIGINT` verrät grob, wie viele Elemente (Kunden, Artikel etc.) es gibt und auch in welcher Reihenfolge sie angelegt wurden.

Je nach aktuellen Anforderungen gibt es mehrere Herangehensweisen.

## Nur interne ID

Wenn der Zeitpunkt, an dem ein Datensatz erstellt wurde, keine geheime Information darstellt (Blog-Artikel, Social Media-Beiträge etc.), kann für den Primärschlüssel einfach eine UUIDv7 erzeugt werden und dieser auch nach außen ans Frontend gegeben werden.

Das `CREATE TABLE`-Statement kann dann folgendermaßen aussehen:

```sql "UUID" "uuidv7()"
CREATE TABLE "posts" {
	"id" UUID PRIMARY KEY DEFAULT uuidv7(),
	# weitere Spalten
}
```

## Interne + externe ID

Muss dagegen extern auf jeden Fall eine vollständig zufällige ID verwendet werden, weil der Zeitpunkt der Erstellung des Datensatzes eine sensible Information darstellt, müssen zwei separate IDs erstellt werden. Eine interne für Datenbank-Zwecke wie Fremdschlüsselbeziehungen und eine Externe für Clients.

Die interne ID ist dabei am besten vom Typ `BIGINT` und ein klassischer selbstinkrementierender Wert. Die externe ID ist dann eine UUIDv4.

Das `CREATE TABLE`-Statement kann dann folgendermaßen aussehen:

```sql "BIGINT" "GENERATED ALWAYS AS IDENTITY" "UUID" "uuidv4()"
CREATE TABLE "users" {
	"id" BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"external_id" UUID UNIQUE DEFAULT uuidv4(),
	# weitere Spalten
}
```
