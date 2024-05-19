import styled from '@emotion/styled';
import { Box } from '@mui/material';

const EventLabel = styled(Box)`
    height: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export default EventLabel;
