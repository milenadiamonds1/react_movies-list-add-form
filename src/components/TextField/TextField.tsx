import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../utillites';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const hasValidateError = (label === 'Image URL' || label === 'Imdb URL')
    && touched
    && value
    && !pattern.test(value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {hasValidateError && (
        <p className="help is-danger">
          {`${label} is invalid`}
        </p>
      )}
    </div>
  );
};