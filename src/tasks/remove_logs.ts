import { task } from 'hardhat/config';

export default task('remove-logs')
  .setDescription(
    'Removes console.log calls and imports from local source files',
  )
  .setAction(import.meta.resolve('../actions/remove_logs.js'))
  .build();
