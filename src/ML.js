import React from 'react';
import { Box, Button  } from '@aragon/ui';


function ML() {
  return (
    <div className='text-center'>
  <Box>
  <select class="form-select-lg" aria-label="Default ">
  <option selected>Select Project</option>
  <option value="1">Project A</option>
  <option value="2">Project B</option>
  <option value="3">Project C</option>
</select>
<br/><br/><br/>
<Button label="Calculate SOC" mode="strong" />

<br/><br/><br/>
<Button label="Calculate Carbon Credits" mode="strong" />

</Box>
    </div>
  )
}

export default ML;
