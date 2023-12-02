import { Box, Grid, NumberInput, Field, FieldHint, FieldLabel, FieldError } from '@strapi/design-system'
import { useIntl } from 'react-intl'
import MapView from "./MapView";
import React, { useEffect, useId, useMemo } from "react";
import MapMarker from "./MapMarker";
import getTrad from "../../utils/getTrad";
import { useFloatValue } from '../../hooks/useFloatValue';
import { LatLng } from 'leaflet';

type Props = {
    labelAction: any
    error: any
    attribute: {
        type: string
        optionsDefaultLat: string
        optionsDefaultLng: string
        requied: boolean
    }
    name: string
    value?: string
    intlLabel: any
    hint?: string
    onChange: (event: { target: { name: string, value: string, type: string } }) => void
}

const fallbacCenter = { lat: -19.8335765, lng: 34.83901775732859 }

const Input = React.forwardRef<HTMLDivElement, Props>((
    {
        intlLabel,
        hint,
        attribute,
        value,
        name,
        onChange,
        labelAction,
        error,
        ...props
    },
    ref
) => {
    const generatedId = useId()
    
    const parsedValue = useMemo(() => {
        if(!value) return
        const parsed = JSON.parse(value)
        if(typeof parsed !== 'object') return
        return parsed
    }, [value])

    const lat = useFloatValue(parsedValue?.lat, attribute.optionsDefaultLat, fallbacCenter.lat)
    const lng = useFloatValue(parsedValue?.lng, attribute.optionsDefaultLng, fallbacCenter.lng)
    const displayValue = useMemo(() => ({ lat, lng }), [lat, lng, parsedValue])
    const { formatMessage } = useIntl()

    const onChangeHandler = (val: LatLng) => {
        onChange({
            target: {
                name,
                type: attribute.type,
                value: JSON.stringify(val)
            }
        })
    }

    useEffect(() => {
        if(!parsedValue && (attribute.optionsDefaultLat || attribute.optionsDefaultLng)) {
            // @ts-ignore
            onChangeHandler(new LatLng(attribute.optionsDefaultLat, attribute.optionsDefaultLng))
        }
    }, [])

    return (
        <Field ref={ref} name={name} hint={hint} error={error} required={attribute.requied} id={generatedId}>
            <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
            <FieldHint />
            <FieldError />
            <Box marginTop={2} borderColor='primary200'>
                <MapView center={displayValue} onClick={onChangeHandler}>
                    {parsedValue && <MapMarker latLng={parsedValue} onChange={onChangeHandler} />}
                </MapView>
            </Box>
            <Grid marginTop={2} gridCols={2} gap={4}>
                <NumberInput disabled label={formatMessage({ id: getTrad('latitude'), defaultMessage: 'Latitude' })} value={parsedValue?.lat || ''} />
                <NumberInput disabled label={formatMessage({ id: getTrad('longitude'), defaultMessage: 'Longitude' })} value={parsedValue?.lng || ''} />
            </Grid>
        </Field>
    )
})

Input.displayName = 'OpenStreetMapsInput'

export default Input