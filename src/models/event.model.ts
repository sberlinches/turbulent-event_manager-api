import config from 'config';
import {Collection, CollectionCreateOptions, InsertOneWriteOpResult, MongoClient, ObjectID} from 'mongodb';
import {MongoCollection} from '../lib/mongoCollection';

/**
 * Event entity
 */
export interface Event {
  readonly _id?: ObjectID;
  title: string;
  scheduledAt: Date;
}

/**
 * Event model
 */
export class EventModel extends MongoCollection {

  _collection: Collection<Event>;
  dbName: string;
  collectionName: string;
  collectionOptions: CollectionCreateOptions;

  constructor(mongoClient: MongoClient) {
    super(mongoClient);

    this.dbName = config.get('mongo.dbName');
    this.collectionName = config.get('mongo.collections.events.collectionName');
    this.collectionOptions = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'title', 'scheduledAt' ],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            scheduledAt: {
              bsonType : 'date',
              description: 'Must be a date and is required',
            },
          },
        },
      },
    };
  }

  /**
   * Creates the collection in the DB (if it doesn't exists)
   */
  public async createCollection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._mongoClient
        .db(this.dbName)
        .createCollection(this.collectionName, this.collectionOptions)
        .then((collection) => {
          this._collection = collection;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * @return {Collection<Event>}
   */
  public get collection(): Collection<Event> {
    return this._collection;
  }

  /**
   * @return {Promise<Array<Event>>} — A list of events
   */
  public async findAll(): Promise<Array<Event>> {
    return this._collection
      .find({})
      .toArray();
  }

  /**
   * @param {Event} event — A valid event object
   */
  public async insertOne(event: Event): Promise<InsertOneWriteOpResult> {
    return this._collection
      .insertOne(event);
  }
}
