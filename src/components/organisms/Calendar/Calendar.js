import React from 'react';
import styled from 'styled-components';
import CalendarDay from 'components/atoms/CalendarDay/CalendarDay';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 240px);
    grid-template-rows: repeat(7, 85px);
    gap: 12px;
    grid-auto-flow: column;
    margin: 40px 0;
    &>div:first-of-type{
        grid-row-start: ${({gridmove}) => gridmove};
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
