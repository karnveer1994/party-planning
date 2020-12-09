'use strict'

const members = require('./members')

exports.plan_parties = async function () {
  const selection = randomNumber(1, 3)
  groupCreationSelector(3)

}

function groupCreationSelector(selection) {
  switch (selection) {
    case 1:
      levelBased()
    case 2:
      departmentBased()
    case 3:
      interestBased()
    case 4:
      combination()
    default:
  }
}

function levelBased() {
  const levels = Array.from(new Set(members.map(m => m.level)))
  const randomLevel = levels[Math.floor(Math.random() * levels.length)]

  let filteredMembers = members.filter(m => m.level === randomLevel);
  filteredMembers = fromUniqueCompany(filteredMembers)
  console.log(filteredMembers.slice(0, 8))
  console.log(themeSelector(filteredMembers.slice(0, 8)))
}

function interestBased() {
  const interests = getUniqueTopics()
  const randomInterest = interests[Math.floor(Math.random() * interests.length)]
  let filteredMembers = members.filter(m => m.interests.filter(i=> i.topic == randomInterest && i.interest > 1).length > 0)
  console.log(filteredMembers.slice(0,8))
  console.log(randomInterest)
}

function themeSelector(arr) {
  const interests = [].concat.apply([], arr.map(el => el.interests.filter(i => i.interest > 0)))
  const topics = interests.map(i => i.topic)
  return topics.sort((a, b) =>
    topics.filter(v => v === a).length
    - topics.filter(v => v === b).length
  ).pop();
}

function fromUniqueCompany(items) {
  const resArr = []
  items.forEach(function (item) {
    var i = resArr.findIndex(x => x.company === item.company);
    if (i <= -1) {
      resArr.push(item);
    }
  });
  return resArr;
}

function departmentBased() {
  const departments = Array.from(new Set(members.map(m => m.department)))

}


function combination() {

}

function getUniqueTopics() {
  const arr = [].concat.apply([], members.map(m => m.interests.filter(i => i.interest > 0).map(i => i.topic)))
  return Array.from(new Set(arr))
}

function randomNumber(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

// These lines allow your function to be called from the command line.
if (require.main === module) {
  exports.plan_parties()
}
