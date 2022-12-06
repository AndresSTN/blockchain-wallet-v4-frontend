import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'

import { Button, HeartbeatLoader, Text } from 'blockchain-info-components'
import Form from 'components/Form/Form'
import FormGroup from 'components/Form/FormGroup'
import FormItem from 'components/Form/FormItem'
import FormLabel from 'components/Form/FormLabel'
import TextBox from 'components/Form/TextBox'
import { RecoverSteps } from 'data/types'
import { required, validEmail } from 'services/forms'
import { removeWhitespace } from 'services/forms/normalizers'

import { Props } from '..'
import { BackArrowFormHeader, FormWrapper } from '../model'

const ForgotPasswordEmail = (props: Props) => {
  const { busy, formValues, invalid, product, routerActions, setStep, signupActions, submitting } =
    props

  const handleSubmit = (e) => {
    e.preventDefault()
    signupActions.triggerRecoverEmail(formValues?.recoveryEmail)
    setStep(RecoverSteps.CHECK_INBOX)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormWrapper>
        <BackArrowFormHeader
          handleBackArrowClick={() => routerActions.push(`/login?product=${product}`)}
          step={RecoverSteps.FORGOT_PASSWORD_EMAIL}
        />
        <Text color='grey900' size='20px' weight={600} lineHeight='1.5'>
          <FormattedMessage
            id='scenes.recover.forgot_password_email.header'
            defaultMessage='Forgot Password'
          />
        </Text>
        <Text color='grey900' size='16px' weight={500} lineHeight='1.5'>
          <FormattedMessage
            id='scenes.recover.forgot_password_email.copy'
            defaultMessage="We'll email you a link to recover your account"
          />
        </Text>
        <FormGroup>
          <FormItem style={{ marginTop: '24px' }}>
            <FormLabel htmlFor='recoveryEmail'>
              <FormattedMessage
                id='scenes.recover.email_request'
                defaultMessage='Enter your email'
              />
            </FormLabel>
            <Field
              autoFocus
              component={TextBox}
              data-e2e='recoverEmail'
              disableSpellcheck
              errorBottom
              errorLeft
              name='recoveryEmail'
              normalize={removeWhitespace}
              validate={[required, validEmail]}
              placeholder='Enter Email'
            />
          </FormItem>
        </FormGroup>

        <Button
          type='submit'
          nature='primary'
          fullwidth
          height='48px'
          disabled={submitting || invalid || busy || !formValues}
          data-e2e='loginButton'
          style={{ marginBottom: '16px' }}
        >
          {submitting ? (
            <HeartbeatLoader height='20px' width='20px' color='white' />
          ) : (
            <Text color='whiteFade900' size='16px' weight={600}>
              <FormattedMessage id='buttons.continue' defaultMessage='Continue' />
            </Text>
          )}
        </Button>
        <Text
          color='blue600'
          size='13px'
          weight={600}
          data-e2e='loginImportAccount'
          style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => setStep(RecoverSteps.RECOVERY_PHRASE)}
        >
          <FormattedMessage
            id='scenes.recover.email_request.12_word_option'
            defaultMessage='Recover via 12 Word Recovery Phrase'
          />
        </Text>
      </FormWrapper>
    </Form>
  )
}

export default ForgotPasswordEmail
