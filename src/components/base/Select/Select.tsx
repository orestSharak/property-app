import React, {
  forwardRef,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import ChevronIcon from '../../../assets/icons/chevron-icon.svg'
import {
  DisplayText,
  DropItem,
  DropList,
  ErrorText,
  HintText,
  IconContainer,
  Label,
  LabelStar,
  SelectContainer,
  SelectWrapper,
  StyledButton,
} from './Select.styles'
import { Option, SelectDirection } from './Select.types'

type SelectProps = {
  id: string
  direction?: SelectDirection
  label: string
  hideLabel?: boolean
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  slotEnd?: ReactNode
  options: Option[]
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void
  placeholder?: string
}

// Util: get first enabled option index
function getFirstEnabledIdx(arr: Option[]) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].disabled) return i
  }
  return null
}

// Util: get currently selected option index or first enabled
function getSelectedOrFirstEnabledIdx(arr: Option[], value?: string) {
  const idx = arr.findIndex((opt) => opt.value === value && !opt.disabled)
  if (idx !== -1) return idx
  return getFirstEnabledIdx(arr) ?? 0
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      id,
      direction = 'overline',
      label,
      hideLabel = false,
      hint,
      error,
      required,
      disabled,
      slotEnd,
      options,
      value,
      onChange,
      placeholder,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [highlighted, setHighlighted] = useState<number | null>(null)
    const selectRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const listBoxRef = useRef<HTMLUListElement>(null)

    useImperativeHandle(ref, () => selectRef.current as HTMLDivElement)
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const ariaDescribedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const selectedOption = options.find((opt) => opt.value === value)
    const displayText = selectedOption ? selectedOption.label : placeholder

    // When menu opens, highlight selected or first enabled option
    useEffect(() => {
      if (open) {
        setHighlighted(getSelectedOrFirstEnabledIdx(options, value))
      }
      // Warning: include options and value in dependencies so selection updates if prop changes externally
    }, [open, options, value])

    // Keyboard handling
    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      if (disabled) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setHighlighted(getSelectedOrFirstEnabledIdx(options, value))
        } else {
          setHighlighted((prev) => {
            let idx = prev ?? -1
            do {
              idx += 1
            } while (idx < options.length && options[idx]?.disabled)
            // clamp to last
            if (idx >= options.length) return prev
            return idx
          })
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setHighlighted(getSelectedOrFirstEnabledIdx(options, value))
        } else {
          setHighlighted((prev) => {
            let idx = prev ?? options.length
            do {
              idx -= 1
            } while (idx >= 0 && options[idx]?.disabled)
            // clamp to first
            if (idx < 0) return prev
            return idx
          })
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setHighlighted(getSelectedOrFirstEnabledIdx(options, value))
        } else if (highlighted != null && !options[highlighted]?.disabled) {
          select(options[highlighted]!.value)
        }
      } else if (e.key === 'Escape') {
        setOpen(false)
        setHighlighted(null)
        buttonRef.current?.focus()
      } else if (e.key === 'Tab') {
        setOpen(false)
        setHighlighted(null)
      }
    }

    function select(val: string) {
      if (onChange) onChange(val)
      setOpen(false)
      setHighlighted(null)
      buttonRef.current?.focus()
    }

    function handleOptionClick(idx: number) {
      const option = options[idx]
      if (option.disabled) return
      select(option.value)
    }

    // Close on outside click
    useEffect(() => {
      if (!open) return

      function onClick(e: MouseEvent) {
        if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
          setOpen(false)
          setHighlighted(null)
        }
      }

      window.addEventListener('mousedown', onClick)
      return () => window.removeEventListener('mousedown', onClick)
    }, [open])

    // Scroll highlighted into view
    useEffect(() => {
      if (open && listBoxRef.current && highlighted != null) {
        const opt = listBoxRef.current.children[highlighted] as HTMLElement | undefined
        opt?.scrollIntoView({ block: 'nearest' })
      }
    }, [open, highlighted])

    const isOverlineDirection = direction === 'overline'

    return (
      <SelectWrapper $direction={direction} ref={selectRef}>
        {!hideLabel && (
          <Label $direction={direction} htmlFor={id} disabled={disabled}>
            {label}
            {required && isOverlineDirection && <LabelStar>*</LabelStar>}
          </Label>
        )}
        <SelectContainer>
          <StyledButton
            ref={buttonRef}
            id={id}
            type="button"
            hasError={!!error}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? `${id}-listbox` : undefined}
            aria-label={hideLabel ? label : undefined}
            aria-describedby={ariaDescribedBy}
            aria-activedescendant={
              open && highlighted != null ? `${id}-option-${highlighted}` : undefined
            }
            data-selected={!!selectedOption}
            $open={open}
            onClick={() => {
              if (!disabled) setOpen((v) => !v)
            }}
            onKeyDown={handleKeyDown}
          >
            <DisplayText selected={!!selectedOption} disabled={disabled}>
              {displayText}
            </DisplayText>
            <IconContainer $open={open} $disabled={disabled}>
              {slotEnd || <ChevronIcon />}
            </IconContainer>
          </StyledButton>
          {open && (
            <DropList
              role="listbox"
              id={`${id}-listbox`}
              ref={listBoxRef}
              tabIndex={-1}
              aria-activedescendant={
                highlighted != null ? `${id}-option-${highlighted}` : undefined
              }
            >
              {options.map((opt, idx) => (
                <DropItem
                  key={opt.value}
                  id={`${id}-option-${idx}`}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  selected={opt.value === value}
                  highlighted={idx === highlighted}
                  disabled={opt.disabled}
                  onClick={() => handleOptionClick(idx)}
                  onMouseEnter={() => setHighlighted(idx)}
                  tabIndex={-1}
                >
                  {opt.label}
                </DropItem>
              ))}
            </DropList>
          )}
          {hint && <HintText id={hintId}>{hint}</HintText>}
          {!!error && <ErrorText id={errorId}>{error}</ErrorText>}
        </SelectContainer>
      </SelectWrapper>
    )
  },
)

Select.displayName = 'Select'

export { Select }
