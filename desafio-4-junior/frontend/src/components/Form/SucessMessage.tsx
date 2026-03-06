import check from '../../../assets/images/icon-success-check.svg'

interface SucessMessageProps {
  visible: boolean
}

export function SucessMessage({ visible }: SucessMessageProps) {
  return (
    <>
      {visible && (
        <div className="sucess-div" role="status">
          <p className="message-check">
            <img src={check} alt="Check" className="padding-right" />
            Message Sent!
          </p>
          <p className="thanks-message">
            Thanks for completing the form. We'll be in touch soon!
          </p>
        </div>
      )}
    </>
  )
}
