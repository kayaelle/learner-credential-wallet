import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import {
  ApprovalStatus,
  ApprovalMessage,
  PendingCredential,
  setCredentialApproval,
} from '../../store/slices/credentialFoyer';
import { getAllCredentials } from '../../store/slices/wallet';
import { CredentialRecord } from '../../model';
import { theme, Color } from '../../styles';
import styles from './ApprovalControls.styles';
import type { Credential } from '../../types/credential';
import { useAccessibilityFocus } from '../../hooks';

enum StatusIcon {
  Schedule = 'schedule',
  Close = 'close',
  Done = 'done',
}

type ApprovalControlsProps = {
  pendingCredential: PendingCredential;
};

type ApprovalButtonProps = {
  title: string;
  onPress: () => void;
  primary?: boolean; 
}

const iconFor = (status: ApprovalStatus): StatusIcon => ({
  [ApprovalStatus.Pending]: StatusIcon.Schedule,
  [ApprovalStatus.PendingDuplicate]: StatusIcon.Schedule,
  [ApprovalStatus.Errored]: StatusIcon.Close,
  [ApprovalStatus.Rejected]: StatusIcon.Close,
  [ApprovalStatus.Accepted]: StatusIcon.Done,
})[status];

const colorFor = (status: ApprovalStatus): Color  => ({
  [ApprovalStatus.Pending]: theme.color.success,
  [ApprovalStatus.PendingDuplicate]: theme.color.success,
  [ApprovalStatus.Errored]: theme.color.error,
  [ApprovalStatus.Rejected]: theme.color.error,
  [ApprovalStatus.Accepted]: theme.color.success,
})[status];

const defaultMessageFor = (status: ApprovalStatus): ApprovalMessage => ({
  [ApprovalStatus.Pending]: ApprovalMessage.Pending,
  [ApprovalStatus.PendingDuplicate]: ApprovalMessage.Duplicate,
  [ApprovalStatus.Accepted]: ApprovalMessage.Accepted,
  [ApprovalStatus.Rejected]: ApprovalMessage.Rejected,
  [ApprovalStatus.Errored]: ApprovalMessage.Errored,
})[status];

function ApprovalButton({ title, onPress, primary }: ApprovalButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.button, primary && styles.buttonPrimary]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={[styles.buttonText, primary && styles.buttonTextPrimary]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function ApprovalControls({ pendingCredential }: ApprovalControlsProps): JSX.Element {
  const dispatch = useDispatch();
  const { credential, status, messageOveride } = pendingCredential;
  const message = messageOveride || defaultMessageFor(status);
  const [statusRef, focusStatus] = useAccessibilityFocus<View>();

  async function add(credential: Credential): Promise<void> {
    await CredentialRecord.addCredential(CredentialRecord.rawFrom(credential));
    dispatch(getAllCredentials());
  }

  function setApprovalStatus(status: ApprovalStatus) {
    dispatch(setCredentialApproval({
      ...pendingCredential,
      status,
    }));
  }

  function reject() {
    setApprovalStatus(ApprovalStatus.Rejected);
    focusStatus();
  }

  useEffect(focusStatus, []);

  async function accept() {
    try {
      await add(credential);

      setApprovalStatus(ApprovalStatus.Accepted);
    } catch (err) {
      console.warn(err);

      setApprovalStatus(ApprovalStatus.Errored);
    }
    focusStatus();
  }

  switch (status) {
  case ApprovalStatus.Pending:
    return (
      <View style={styles.approvalContainer}>
        <ApprovalButton title="Decline" onPress={reject} />
        <View style={styles.buttonSpacer} />
        <ApprovalButton title="Accept" onPress={accept} primary />
      </View>
    );
  case ApprovalStatus.PendingDuplicate:
    return (
      <>
        <View style={styles.approvalContainer}>
          <ApprovalButton title="Skip" onPress={reject} primary />
          <View style={styles.buttonSpacer} />
          <ApprovalButton title="Accept" onPress={accept} />
        </View>
        <Text style={styles.statusTextOutside}>{message}</Text>
      </>
    );
  default:
    return (
      <View style={styles.approvalContainer} accessible>
        <View style={styles.credentialStatusContainer} ref={statusRef}>
          <MaterialIcons
            color={colorFor(status)}
            name={iconFor(status)}
            size={theme.iconSize}
          />
          <Text style={styles.statusText}>{message}</Text>
        </View>
      </View>
    );
  }
}
