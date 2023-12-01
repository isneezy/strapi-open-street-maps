import { GenericInputProps } from "@strapi/helper-plugin";

type Props = {
    attribute: string
}

export default function Input (props: Props) {
    console.log(props)
    return <p>strapi-open-street-maps</p>
}