import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { Divider, Link, Box, Container, AppBar, Toolbar, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { alpha } from "@mui/material";
import VerticalTabs from '@/components/tabs';
import Header from '@/components/header';
import { useRouter } from 'next/router'
import TabsSettings from '@/pages/tabs/TabsSettings';
import { serverSideAuthCheck } from '@/auth/serverSideAuthCheck';
import { MyContext, MyContextProvider } from '@/context/myContext';
import { GetServerSidePropsContext } from 'next';
import { useUser } from '@/auth/useUser';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { useAuth } from '@/auth/authUserContext';
import dayjs from 'dayjs';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return serverSideAuthCheck(context)
}

export default function SlicePage() {
  const router = useRouter();
  const { user } = useAuth()
  const { slice } = router.query;

  const [changesHappened, setChangesHappened] = useState(false)

  const { setSliceName, setSliceDescription } = useContext(MyContext)
  const { setSelectedRadio,
    setBandwidthWithPerSlice, setNumberOfDevicesWithPerSlice,
    setBandwidthWithPerDevice, setNumberOfDevicesWithPerDevice,
    setBandwidthWithDensity, setNumberOfDevicesWithDensity } = useContext(MyContext)
  const { setSelectedCore,
    setSelectedTrafficWithOperator, setSelectedFallbackWithOperator,
    setSelectedDataCenterWithLocal, setSelectedTrafficWithLocal, setSelectedFallbackWithLocal,
    setSelectedTransferCore, setSelectedFallbackWithTransfer } = useContext(MyContext)
  const { setGeographyType, setCountry, setShapesGeography } = useContext(MyContext)
  const { setStartDate, setCheckedEndDate, setEndDate } = useContext(MyContext)
  const { setSelectedBilling } = useContext(MyContext)
  const { setSelectedImsi } = useContext(MyContext)

  const [allDataLoaded, setAllDataLoaded] = useState(false)

  function setContext() {
    if (!changesHappened) {
      if (user) {
        var slicesFullRef = firebase.database().ref('slices_preview/' + user?.id + '/' + slice);
        slicesFullRef.on('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            setSliceName(data.name)
            setSliceDescription(data.description)
            setSelectedRadio(data.radio.type)
            switch (data.radio.type) {
              case 'per_slice':
                setBandwidthWithPerSlice(data.radio.bandwidth)
                setNumberOfDevicesWithPerSlice(data.radio.numberOfDevices)
                break
              case 'per_device':
                setBandwidthWithPerDevice(data.radio.bandwidth)
                setNumberOfDevicesWithPerDevice(data.radio.numberOfDevices)
                break
              case 'density':
                setBandwidthWithDensity(data.radio.bandwidth)
                setNumberOfDevicesWithDensity(data.radio.numberOfDevices)
                break
            }
            setSelectedCore(data.core.type)
            switch (data.core.type) {
              case 'operator':
                setSelectedTrafficWithOperator(data.core.traffic)
                if (data.core.traffic === 'VPN') {
                  setSelectedFallbackWithOperator(data.core.fallback)
                }
                break
              case 'local':
                setSelectedDataCenterWithLocal(data.core.dataCenter)
                setSelectedTrafficWithLocal(data.core.traffic)
                if (data.core.traffic === 'VPN') {
                  setSelectedFallbackWithLocal(data.core.fallback)
                }
                break
              case 'transfer':
                setSelectedTransferCore(data.core.transferCore)
                setSelectedFallbackWithTransfer(data.core.fallback)
                break
            }
            setGeographyType(data.geography.type)
            switch (data.geography.type) {
              case 'country':
                setCountry(data.geography.country)
                break
              default:
                setShapesGeography(data.geography.shapes.map(shapeJson => JSON.parse(shapeJson)))
                break
            }
            setStartDate(dayjs(data.time.startDate))
            if (data.time.endDate != '') {
              setCheckedEndDate(true)
              setEndDate(dayjs(data.time.endDate))
            }
            setSelectedBilling(data.billing)
            setSelectedImsi(data.configuration.imsi.type)

            setAllDataLoaded(true)
          }
        });
        return () => {
          slicesFullRef.off('value');
        };
      }
    }
  }

  useEffect(() => {
    setContext()
  }, [user])

  return (
    <>
      <Head>
        <title>{slice + ' / Settings'}</title>
      </Head>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Header mainText={(slice ? slice : '') + ' / Settings'} useHomeButton={true} isBold={true} />
        <Box sx={{ mt: 4 }}>
          {allDataLoaded
            ? <TabsSettings />
            : <Typography>Loading...</Typography>
          }
        </Box>
      </Container>
    </>
  );
}
