import { ReactElement } from 'react';
import clsx from 'clsx';

interface IDiamondButtonProps {
  isDisabled?: boolean;
  handleClick?: () => void;
  size?: 'sm' | 'lg';
  icon?: ReactElement | null;
}

export const DiamondButton = (props: IDiamondButtonProps): ReactElement => {
  const { isDisabled = false, handleClick = () => null, size = 'md', icon = null } = props;
  const sizeClass =
    size === 'sm'
      ? 'w-14 h-14 border-2'
      : size === 'lg'
      ? 'w-20 h-20 border-4'
      : 'w-16 h-16 border-4';
  return (
    <div className="text- flex space-x-2 justify-center">
      <button
        disabled={isDisabled}
        type="button"
        className={clsx(
          'flex bg-buttons-diamond-btn-bg-color rotate-45 items-center justify-center border-buttons-diamond-btn-border-color child:-rotate-45 child:m-1',
          sizeClass,
          {
            'disabled:opacity-50 disabled:cursor-not-allowed': isDisabled,
          },
        )}
        onClick={handleClick}
      >
        {/* {icon} */}
        <img src="/images/icons/cross.svg" alt="cross" />
      </button>
    </div>
  );
};
