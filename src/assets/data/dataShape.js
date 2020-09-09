export const dataShape = {
  id: 'id',
  cycleId: 'cycleId',
  category: 'category',
  title: 'title',
  ammount: 'ammount',
  paidAmmount: 'paidAmmount',
  closed: 'closed',
  description: 'description',
  deadline: 'deadline',
  cycle: 'cycle',
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
