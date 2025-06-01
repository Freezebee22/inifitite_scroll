import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchData, selectItems } from '../../services/slices/table';
import { Table }  from '../table';
import { CreateForm }  from '../createForm';
import styles from './app.module.css';

export default function App() {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Таблица с данными</h1>
            <CreateForm />
            <Table items={items} />
        </div>
    );
}
