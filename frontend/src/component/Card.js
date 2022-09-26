import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

function AboutCard({name, classes, image, work, email}){
    return(
        <Card fluid color='red'>
            <Image src={image} alt="Image in about" wrapped ui={false} />
            <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
                <p><Icon name='handshake' />{work}</p>
            </Card.Meta>
            <Card.Description>
            {classes}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <p>
                <Icon name='address book' />{email}
            </p>
            </Card.Content>
        </Card>
    );
}

export default AboutCard;
