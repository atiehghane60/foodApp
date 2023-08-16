import { TableTypes } from './propTypes';
import styles from './styles.module.scss';

function Table({ data, rows, columns }: TableTypes) {
  return (
    <table className={styles.root}>
      <tr>
        {columns.map((col: string, index: number) => (
          <th key={index}>{col}</th>
        ))}
      </tr>

      {data.map((item: any, i: number) => (
        <tr>
          {rows.map((row: string, index: number) => (
            <td>{item[row]}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}
export default Table;
