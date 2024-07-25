import { Anchor, Box, H5, Jumbo, Page, Paragraph, Text } from '@gilbarbara/components';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddRecipes from '~/components/DashboardComponents/AddRecipes';

import Github from '~/containers/GitHub';

function Private() {
  const [show, setShow] = useState<boolean>(false); // Explicitly annotate show as boolean

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <Page key="Private" data-component-name="Private">
      <Box mb="lg" textAlign="center">
        <Jumbo mb={0}>Oh hai!</Jumbo>
        <Paragraph>
          You can get this boilerplate{' '}
          <Anchor external href="https://github.com/gilbarbara/react-redux-saga-boilerplate/">
            here
          </Anchor>
        </Paragraph>
      </Box>
      <Box mb="xl" textAlign="center">
        <H5 mb={0}>Here's some GitHub data</H5>
        <Text size="xs">
          <i>*Just to have some requests in the sagas...</i>
        </Text>
      </Box>
      <Github />
    </Page>
  );
}

export default Private;
