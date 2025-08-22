import styles from './Button.module.css'

const Button: React.FC<{
    children: string
    onClick: () => void
    isDisabled?: boolean
}> = ({ children, onClick, isDisabled }) => (
    <button className={styles.btn} onClick={onClick} disabled={isDisabled}>
        {children}
    </button>
)

export default Button
