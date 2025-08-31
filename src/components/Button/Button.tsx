import styles from './Button.module.css'

const Button: React.FC<{
    children: string
    dataTestId?: string
    onClick?: () => void
    isDisabled?: boolean
}> = ({ children, dataTestId, onClick, isDisabled }) => (
    <button
        data-test-id={dataTestId}
        className={styles.btn}
        onClick={onClick}
        disabled={isDisabled}
    >
        {children.trim()}
    </button>
)

export default Button
