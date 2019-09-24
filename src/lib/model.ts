import {CollectionCreateOptions, MongoClient, Collection} from 'mongodb';

interface ModelInterface {
  dbName: string;
  collectionName: string;
  collectionOptions: object;
}

export abstract class Model implements ModelInterface {

  protected readonly client: MongoClient;
  protected abstract collection: Collection;
  public abstract dbName: string;
  public abstract collectionName: string;
  public abstract collectionOptions: CollectionCreateOptions;

  protected constructor(client: MongoClient) {
    this.client = client;
  }

  public abstract findAll();
  public abstract insertOne(object: object);
  // etc...
}
