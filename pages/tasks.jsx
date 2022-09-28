import React from 'react';

// MUI
import Typography from '@mui/material/Typography';

// Components
import { MuiCard } from '../components';

const Tasks = ({ tasks }) => {
  return (
    <div className='tasks tasks__container'>
      <Typography className='tasks__title' variant='h3' component='p'>
        Tasks
      </Typography>

      <div className='tasks__list'>
        {tasks.map((task) => (
          <MuiCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const url = `${process.env.NEXT_PUBLIC_TASKS_BASE_URL}/tasks`;

  // Fetch data from external API
  const res = await fetch(url);
  const tasks = await res.json();

  console.log(tasks);

  // Pass data to the page via props
  return { props: { tasks } };
}

export default Tasks;