import {
  Body,
  Container,
  Head,
  Heading,
  Text,
  Tailwind,
} from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  message: string;
}

export const WelcomeEmail = ({ name, email, message }: EmailProps) => (
  <Tailwind>
    <Body className="bg-white font-sans">
      <Container className="p-8 border border-gray-200 rounded-lg">
        <Heading className="text-2xl font-bold text-gray-900">
          ¡Nuevo Proyecto en Estudio Camaleón!
        </Heading>
        <Text className="text-gray-600">
          Has recibido una nueva solicitud de:
        </Text>
        <Text className="font-bold text-lg">
          {name} ({email})
        </Text>
        <Text className="bg-gray-50 p-4 rounded text-gray-800 italic border-l-4 border-green-500">
          "{message}"
        </Text>
      </Container>
    </Body>
  </Tailwind>
);
