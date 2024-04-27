const mergeUnitItemsWithTravelers = (unitItems, travelers, travelersInfoQuestionId) => {
  if (unitItems.length !== travelers.length) {
    throw new Error('Both unit items and travelers must have same length')
  }

  const result = []

  for (let i = 0; i < unitItems.length; i++) {
    const traveler = travelers[i]

    const answer = {
      questionId: travelersInfoQuestionId,
      value: `${traveler.firstName} ${traveler.lastName}, ${traveler.age} y.o.`,
    }

    result.push({
      ...unitItems[i],
      questionAnswers: [answer],
    })
  }

  return result
}

module.exports = mergeUnitItemsWithTravelers
