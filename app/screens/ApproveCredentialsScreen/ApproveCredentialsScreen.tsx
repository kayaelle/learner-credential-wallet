import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { navigationRef } from '../../navigation';
import { RootState } from '../../store';
import { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialItem, NavHeader } from '../../components';
import { ApprovalControls } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import { mixins } from '../../styles';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const pendingCredentials = useSelector<RootState, PendingCredential[]>(
    ({ credentialFoyer }) => credentialFoyer.pendingCredentials,
  );

  function goToHome() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', { 
        screen: 'CredentialNavigation',
        params: {
          screen: 'HomeScreen',
        }, 
      });
    }
  }

  function Done(): JSX.Element {
    return (
      <Button
        buttonStyle={styles.doneButton}
        titleStyle={styles.doneButtonTitle}
        onPress={goToHome}
        title="Done"
      />
    );
  }

  function renderItem({ item: pendingCredential }: RenderItemProps) {
    const { credential } = pendingCredential;
    const { credentialSubject, issuer } = credential;

    console.log("CREDENTIAL WHOLE: "+JSON.stringify(credential, null, 2));


    console.log("CREDENTIAL ISSUER: "+JSON.stringify(issuer, null, 2));

    const title = credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    //const issuerImage = typeof issuer === 'string' ? null : issuer?.image;
    const badgeImage = credentialSubject.hasCredential?.image ?? '';
    const onSelect = () => navigation.navigate(
      'ApproveCredentialScreen',
      {
        pendingCredentialId: pendingCredential.id,
      },
    );

    return (
      <CredentialItem
        image={badgeImage}
        title={title}
        subtitle={issuerName}
        onSelect={onSelect}
        bottomElement={<ApprovalControls pendingCredential={pendingCredential} />}
        chevron
      />
    );
  }

  return (
    <>
      <NavHeader 
        title="Available Credentials" 
        rightComponent={<Done />}
      />
      <FlatList
        contentContainerStyle={mixins.credentialListContainer}
        data={pendingCredentials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `credential-${index}`}
      />
    </>
  );
}
