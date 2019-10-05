import moment from 'moment';

const formatDateTime = (dateTime: string = '', outputFormat: string = 'MMM DD, YYYY h:mma'): string => moment(dateTime).format(outputFormat);

export default formatDateTime;
