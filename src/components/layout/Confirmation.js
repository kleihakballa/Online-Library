import React from 'react';
import styles from '../../styles/Confirmation.module.css';

const Confirmation = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
