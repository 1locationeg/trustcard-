export interface PasswordRequirement {
  label: string
  isMet: boolean
}

export interface PasswordStrengthResult {
  requirements: PasswordRequirement[]
  strength: string
  strengthColor: string
  strengthText: string
  strengthWidth: string
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const requirements = [
    { label: "length", isMet: password.length >= 8 },
    { label: "uppercase", isMet: /[A-Z]/.test(password) },
    { label: "lowercase", isMet: /[a-z]/.test(password) },
    { label: "number", isMet: /[0-9]/.test(password) },
    { label: "special", isMet: /[^A-Za-z0-9]/.test(password) },
  ]

  const metCount = requirements.filter(r => r.isMet).length
  let strength = "weak"
  let strengthColor = "bg-slate-200"
  let strengthText = "text-slate-500"
  let strengthWidth = "w-0"

  if (password.length > 0) {
    if (metCount <= 2) {
      strength = "weak"
      strengthColor = "bg-destructive"
      strengthText = "text-destructive"
      strengthWidth = "w-1/3"
    } else if (metCount <= 4) {
      strength = "fair"
      strengthColor = "bg-warning"
      strengthText = "text-warning"
      strengthWidth = "w-2/3"
    } else {
      strength = "strong"
      strengthColor = "bg-success"
      strengthText = "text-success"
      strengthWidth = "w-full"
    }
  }

  return {
    requirements,
    strength,
    strengthColor,
    strengthText,
    strengthWidth,
  }
}
