import { forwardRef, TextareaHTMLAttributes } from 'react'
import {
  ErrorText,
  HintText,
  Label,
  LabelStar,
  StyledTextArea,
  TextAreaContainer,
  TextAreaWrapper,
} from './TextAreat.styles'

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  id: string
  label: string
  hideLabel?: boolean
  hint?: string
  error?: string
}

/**
 * `TextArea` is a multi-line text input component.
 * It's designed to be accessible and provides support for displaying hint and error messages, as well as handling disabled and required states.
 *
 * @param {object} props - The component's props.
 * @param {string} props.id - A unique ID for the textarea, essential for accessibility.
 * @param {string} props.label - The label text for the textarea.
 * @param {boolean} [props.hideLabel=false] - If `true`, the label is visually hidden but remains accessible to screen readers.
 * @param {string} [props.hint] - A hint text displayed below the textarea to provide additional context.
 * @param {string} [props.error] - An error message displayed below the textarea, indicating an invalid state.
 * @param {boolean} [props.required] - If `true`, a required indicator (`*`) is displayed next to the label.
 * @param {boolean} [props.disabled] - If `true`, the textarea is disabled and non-interactive.
 * @param {Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>} rest - All other standard HTML textarea attributes.
 * @param {React.Ref<HTMLTextAreaElement>} ref - A ref to the underlying HTML textarea element.
 * @returns {JSX.Element} The rendered TextArea component.
 *
 * @example
 * // A basic textarea with a label
 * <TextArea id="message" label="Your message" />
 *
 * @example
 * // A textarea with an error message and hint text
 * <TextArea
 * id="notes"
 * label="Notes"
 * error="This field is required"
 * hint="Max 250 characters"
 * required
 * />
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, hint, error, required, disabled, hideLabel = false, ...rest }, ref) => {
    // for aria-describedby links
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <TextAreaWrapper>
        {!hideLabel && (
          <Label htmlFor={id} disabled={disabled}>
            {label}
            {required && <LabelStar aria-hidden="true">*</LabelStar>}
          </Label>
        )}
        <TextAreaContainer>
          <StyledTextArea
            ref={ref}
            id={id}
            hasError={!!error}
            required={required}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={required || undefined}
            aria-label={hideLabel ? label : undefined}
            {...rest}
          />
          {hint && <HintText id={hintId}>{hint}</HintText>}
          {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
        </TextAreaContainer>
      </TextAreaWrapper>
    )
  },
)

TextArea.displayName = 'TextArea'
export { TextArea }
