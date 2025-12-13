import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div>
      <Header title="Einstellungen" />
      <div className="p-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Kontoeinstellungen und Präferenzen
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unternehmensdaten</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Hier können Sie Ihre Unternehmensdaten bearbeiten.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Passen Sie Logo und Farben an.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materialdatenbank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verwalten Sie Ihre Materialien und Preise.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
