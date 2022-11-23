import mongoose from "mongoose"

import Dishes from "../../models/dishes"

const dbname = "confusion"
const url = `mongodb://127.0.0.1:27017/${dbname}`

async function main() {
	const db = await mongoose.connect(url)
	console.log("Connected successfully to server")

	Dishes.create({
		name: "New Dish 4",
		description: "New descr",
	})
		.then(({ _id }) => {
			return Dishes.findByIdAndUpdate(
				_id,
				{
					$set: { description: "updated description" },
				},
				{ new: true },
			).exec()
		})
		.then((dish) => {
			dish?.comments.push({
				rating: 5,
				comment: "Delicious!",
				author: "Mario B",
			})

			return dish?.save()
		})
		.then((dish) => {
			console.log(dish)

			return Dishes.remove({})
		})
		.then((afterRemoval) => {
			console.log({ afterRemoval })

			return Dishes.find({}).exec()
		})
		.then((dishes) => {
			console.log({ dishes })

			return mongoose.connection.close()
		})
		.catch((err) => {
			console.error(err)
			mongoose.connection.close()
		})

	return "done."
}

main()
