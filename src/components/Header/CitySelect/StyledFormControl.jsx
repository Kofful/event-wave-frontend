import styled from '@emotion/styled';
import { FormControl } from '@mui/material';

const StyledFormControl = styled(FormControl)`
    width: 150px;

    .MuiOutlinedInput-notchedOutline {
        border-color: white;
    }
    
    .MuiOutlinedInput-input {
        color: white;
    }

    .MuiOutlinedInput-root:hover {
        .MuiOutlinedInput-notchedOutline {
            border-color: grey;
        }
    }
`;

export default StyledFormControl;
