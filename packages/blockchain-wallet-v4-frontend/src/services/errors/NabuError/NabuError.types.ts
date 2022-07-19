type NabuErrorAction = {
  title: string
  url?: string
}

type NabuErrorIconProps = {
  accessibility: {
    description: string
  }
  status: {
    url: string
  }
  url: string
}

type NabuErrorProps = {
  actions?: NabuErrorAction[]
  icon?: NabuErrorIconProps
  message: string
  title: string
}

export type { NabuErrorAction, NabuErrorIconProps, NabuErrorProps }
