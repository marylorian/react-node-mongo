import { Collection, Db, Document } from "mongodb"
import assert from "assert"

export const insertDocument = async (
	db: Db,
	document: Document,
	collection: string,
) => {
	const dbCollection: Collection = db.collection(collection)
	return dbCollection.insertOne(document)
}

export const findDocuments = async (db: Db, collection: string) => {
	const dbCollection: Collection = db.collection(collection)
	return dbCollection.find({}).toArray()
}

export const removeDocument = async (
	db: Db,
	document: Document,
	collection: string,
) => {
	const dbCollection: Collection = db.collection(collection)
	return dbCollection.deleteOne(document)
}

export const updateDocument = async (
	db: Db,
	document: Document,
	update: Document,
	collection: string,
) => {
	const dbCollection: Collection = db.collection(collection)
	return dbCollection.updateOne(document, { $set: update })
}
