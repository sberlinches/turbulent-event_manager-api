import config from 'config';
import {Collection, CollectionCreateOptions, InsertOneWriteOpResult, MongoClient, ObjectID} from 'mongodb';
import {Model} from '../lib/model';

export interface Event {
  readonly _id?: ObjectID;
  title: string;
  scheduledAt: Date;
}

/**
 * Event model
 */
export class EventModel extends Model {

  collection: Collection;
  dbName: string;
  collectionName: string;
  collectionOptions: CollectionCreateOptions;

  constructor(client: MongoClient) {
    super(client);

    this.dbName = config.get('model.event.db');
    this.collectionName = config.get('model.event.collection');
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
      this.client
        .db(this.dbName)
        .createCollection(this.collectionName, this.collectionOptions)
        .then((collection) => {
          this.collection = collection;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Find all
   * @return {Promise<Array<Event>>} — A list of events
   */
  public async findAll(): Promise<Array<Event>> {
    return this.collection
      .find({})
      .toArray();
  }

  /**
   * Insert one
   * @param {Event} event — A valid event object
   */
  public async insertOne(event: Event): Promise<InsertOneWriteOpResult> {
    return this.collection
      .insertOne(event);
  }
}
