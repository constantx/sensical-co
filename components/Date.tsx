import moment from 'moment';

export default function DateComponent ({ dateString }: {
  dateString: string;
}) {
  return (
    <time dateTime={dateString} className=" text-muted-foreground">
      {moment(dateString).format('MMMM D, YYYY')}
    </time>
  );
}
