import { TASK_REMOVE_LOGS } from '../task_names.js';
import { task } from 'hardhat/config';

export default task(TASK_REMOVE_LOGS)
  .setDescription(
    'Removes console.log calls and imports from local source files',
  )
  .setAction(() => import('../actions/remove_logs.js'))
  .build();
