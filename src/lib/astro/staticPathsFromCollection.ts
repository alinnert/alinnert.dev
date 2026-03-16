import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content'

type Collection<CollectionType extends CollectionKey> =
  CollectionEntry<CollectionType>[]

type CollectionItemData<CollectionType extends CollectionKey> =
  CollectionEntry<CollectionType>['data']

type CollectionItemDataProp<
  CollectionType extends CollectionKey,
  P extends keyof CollectionItemData<CollectionType>,
> = CollectionItemData<CollectionType>[P]

type StaticPathFromCollection<
  CollectionType extends CollectionKey,
  Item extends CollectionEntry<CollectionType> =
    CollectionEntry<CollectionType>,
> = {
  params: { id: Item['id'] }
  props: { item: Item }
}

export function getStaticPathsFromCollection<T extends CollectionKey>(
  collectionName: T,
): () => Promise<StaticPathFromCollection<T>[]> {
  return async (): Promise<StaticPathFromCollection<T>[]> => {
    const collection = await getCollection(collectionName)

    return collection.map((item): StaticPathFromCollection<T> => {
      return { params: { id: item.id }, props: { item } }
    })
  }
}

type StaticPathFromProp = {
  params: { id: string }
  props: { propItem: string }
}

export function getStaticPathsFromProp<
  T extends CollectionKey,
  P extends keyof CollectionItemData<T>,
>(collectionName: T, dataProp: P): () => Promise<StaticPathFromProp[]> {
  return async (): Promise<StaticPathFromProp[]> => {
    const collection: Collection<T> = await getCollection(collectionName)

    const values = new Set<CollectionItemDataProp<T, P>>()
    for (const item of collection) {
      const propItems = (item.data as CollectionItemData<T>)[dataProp]
      if (!Array.isArray(propItems)) continue
      for (const propItem of propItems) {
        values.add(propItem)
      }
    }

    return Array.from(values)
      .map((propItem): StaticPathFromProp | undefined => {
        if (typeof propItem !== 'string') return
        return { params: { id: propItem.toLowerCase() }, props: { propItem } }
      })
      .filter((it): it is StaticPathFromProp => it !== undefined)
  }
}
