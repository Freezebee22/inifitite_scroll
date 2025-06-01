import React, { useState } from 'react';
import { useDispatch } from '../../services/store';
import { addItem } from '../../services/slices/table';
import styles from './createForm.module.css';

const fields = ['name', 'email', 'age', 'address', 'phone'];

const validateForm = (form: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Некорректный email';
    if (!/^\d+$/.test(form.age)) errors.age = 'Возраст должен быть числом';
    if (!/^[A-Za-zА-Яа-я]+$/.test(form.name)) errors.name = 'Имя должно содержать только буквы';
    if (!/^[\d\s()+-]+$/.test(form.phone)) errors.phone = 'Телефон не должен содержать буквы';
    return errors;
};

export const CreateForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState<Record<string, string>>(
        Object.fromEntries(fields.map(f => [f, '']))
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
            try {
                await dispatch(addItem(form));
                setForm(Object.fromEntries(fields.map(f => [f, ''])));
            } catch (err) {
                console.error('Ошибка при добавлении:', err);
            }
        setIsLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field}>
                    <input
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        disabled={isLoading}
                    />
                    {errors[field] && (
                        <div className={styles.error}>{errors[field]}</div>
                    )}
                </div>
            ))}
            <button className={styles.button} type="submit" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Создать'}
            </button>
        </form>
    );
};
