import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from '../../services/store';
import { fetchData } from '../../services/slices/table';
import styles from './table.module.css';

type TableProps = {
    items: Record<string, any>[];
}

export const Table = ({ items }: TableProps) => {
    const dispatch = useDispatch();

    const loadMore = () => {
        dispatch(fetchData()); // ну либо другие данные
    };

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={true} // false, если не надо, чтоб выводились дальше данные
            loader={<h4>Загрузка...</h4>}
        >
            <table className={styles.table}>
                <thead>
                    <tr>
                        {items[0] && Object.keys(items[0]).map((key) => (
                        <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            {Object.values(item).map((val, idx) => (
                                <td key={idx}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </InfiniteScroll>
    );
};
