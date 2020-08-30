import React from 'react';
import styled from 'styled-components';
import CalendarDay from 'components/molecules/CalendarDay/CalendarDay';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px;
    grid-template-rows: repeat(31, 85px);
    gap: 10px;
    grid-auto-flow: column;
    margin: 40px 0;

    @media (min-width: 576px) {
    grid-template-columns: repeat(2, 244px);
    grid-template-rows: repeat(21, 85px);
      &>div:first-of-type{
          grid-row-start: ${({ gridmove }) => gridmove};
      }
    }

    @media (min-width: 992px) {
    grid-template-columns: repeat(3, 244px);
    grid-template-rows: repeat(14, 85px);
      &>div:first-of-type{
          grid-row-start: ${({ gridmove }) => gridmove};
      }
    }

    @media (min-width: 1560px) {
    grid-template-columns: repeat(6, 244px);
    grid-template-rows: repeat(7, 85px);
      &>div:first-of-type{
          grid-row-start: ${({ gridmove }) => gridmove};
      }
    }
`;

class Calendar extends React.Component {
  state = {
    displayedMonthsDays: [],
  };

  componentDidMount() {
    const { context: { currentTime } } = this.props;
    this.getDisplayedMonthsDays(currentTime.getFullYear(), currentTime.getMonth());
  }

  componentDidUpdate(prevProps) {
    const { context: { displiedDate } } = this.props;
    if (displiedDate !== prevProps.context.displiedDate) {
      this.getDisplayedMonthsDays(displiedDate.getFullYear(), displiedDate.getMonth());
    }
  }
  
  // componentWillUnmount() {
  //   const { context: { handleMonthShift } } = this.props;
  //   handleMonthShift(0);
  // }

  getDisplayedMonthsDays = (year, month) => {
    const monthsDay = new Date(year, month, 1);
    const displayedMonthsDays = [];
    while (monthsDay.getMonth() === month) {
      displayedMonthsDays.push(new Date(monthsDay));
      monthsDay.setDate(monthsDay.getDate() + 1);
    }
    this.setState({
      displayedMonthsDays,
    });
  }

  render() {
    const { displayedMonthsDays } = this.state;
    const [firstday] = displayedMonthsDays;
    const gridmove = new Date(firstday).getDay() === 0 ? 7 : new Date(firstday).getDay();
    return (
      <StyledWrapper gridmove={gridmove}>
        {
          displayedMonthsDays.map((day) => <CalendarDay key={day} day={day} />)
        }
      </StyledWrapper>
    );
  }
}

export default withContext(Calendar);
