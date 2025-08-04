import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentProps<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

interface InputGroupProps {
  children: React.ReactNode
  className?: string
}

function InputGroup({ children, className }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn("space-y-2", className)}
    >
      {children}
    </div>
  )
}

interface InputWithLabelProps extends React.ComponentProps<"input"> {
  label?: string
  labelClassName?: string
  description?: string
  error?: string
  required?: boolean
}

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(({ label, labelClassName, description, error, required, className, id, ...props }, ref) => {
  const generatedId = React.useId()
  const inputId = id || generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <InputGroup>
      {label && (
        <Label htmlFor={inputId} className={labelClassName}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {description && (
        <p
          id={descriptionId}
          className="text-sm text-muted-foreground"
        >
          {description}
        </p>
      )}
      <Input
        ref={ref}
        id={inputId}
        aria-describedby={cn(
          descriptionId && descriptionId,
          errorId && errorId
        )}
        aria-invalid={error ? "true" : undefined}
        className={cn(error && "border-destructive", className)}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </InputGroup>
  )
})
InputWithLabel.displayName = "InputWithLabel"

export { Input, Label, InputGroup, InputWithLabel }
