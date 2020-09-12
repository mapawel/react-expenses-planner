export const dataShape = {
  id: 'id',
  createDate: 'createDate',
  category: 'category',
  title: 'title',
  ammount: 'ammount',
  paidAmmount: 'paidAmmount',
  closed: 'closed',
  description: 'description',
  infoWhenPay: 'infoWhenPay',
  deadline: 'deadline',
  cycle: 'cycle',
  cycleElementNr: 'cycleElementNr',
  repeatNumer: 'repeatNumer',
  categories: [
    'holiday',
    'home',
    'car',
    'family',
  ],
  cycles: [
    {
      cycleName: 'every day',
      cycleAddName: 'days',
    },
    {
      cycleName: 'every week',
      cycleAddName: 'weeks',
    },
    {
      cycleName: 'every month',
      cycleAddName: 'months',
    },
    {
      cycleName: 'every year',
      cycleAddName: 'years',
    },
  ],
};
