import React from 'react';
import styles from '../../styles/Verify.module.css';

const Verify = ({ message, verificationCode, setVerificationCode, onConfirm ,onSubmit}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <textarea
                    className={styles.textArea}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    rows="1"
                    placeholder="Enter Code"
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className={styles.closeButton} onClick={onSubmit}>
                        <img src="/Remove-512.webp"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
