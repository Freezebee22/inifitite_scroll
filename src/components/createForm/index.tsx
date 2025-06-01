import React, { useState } from 'react';
import { useDispatch } from '../../services/store';
import { addItem } from '../../services/slices/table';
import styles from './createForm.module.css';

const fields = ['name', 'email', 'age', 'address', 'phone'];

export const CreateForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState<Record<string, string>>(
        Object.fromEntries(fields.map(f => [f, '']))
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await dispatch(addItem(form));
        setForm(Object.fromEntries(fields.map(f => [f, ''])));
        setIsLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map(field => (
                <input
                    key={field}
                    name={field}
                    placeholder={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            ))}
            <button className={styles.button} type="submit" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Создать'}
            </button>
        </form>
    );
};
