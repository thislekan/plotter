import { ModalProps } from "./interface";

export const ModalComponent = ({
  restoreFunc,
  newSessionFunc,
}: ModalProps): JSX.Element => {
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="modal__content__btn modal__content__btn--left"
          onClick={restoreFunc}
        >
          Restore Session
        </button>
        <button
          className="modal__content__btn modal__content__btn--right"
          onClick={newSessionFunc}
        >
          New Session
        </button>
      </div>
    </div>
  );
};
