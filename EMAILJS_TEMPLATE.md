# Configuration EmailJS - Template de Contact

## 📧 Informations de Configuration

### Clés API
- **Service ID**: `service_chyx9dc`
- **Template ID**: `template_u2lfnee`
- **Clé Publique**: `Ntt-YZA6rzMEU_0Si`
- **Clé Privée**: `Ed5tFz9io7gMNwU3bGw7t`

### Email de Réception
- **Destinataire**: `recovexpertconseillere@gmail.com`

## 🎨 Template EmailJS Recommandé

### Variables du Template
Voici les variables que le formulaire envoie au template EmailJS :

```
{{from_name}}     - Nom de l'expéditeur
{{from_email}}    - Email de l'expéditeur  
{{subject}}       - Sujet du message
{{message}}       - Contenu du message
{{to_email}}      - Email de destination
{{reply_to}}      - Email de réponse
```

### Template HTML Suggéré
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d97757, #c96543); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #d97757; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💌 Nouveau Message - Mariage Audrey & Stéphane</h1>
            <p>Message reçu depuis le site de mariage</p>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>👤 Informations de l'expéditeur</h3>
                <p><strong>Nom:</strong> {{from_name}}</p>
                <p><strong>Email:</strong> {{from_email}}</p>
                <p><strong>Sujet:</strong> {{subject}}</p>
            </div>
            
            <div class="info-box">
                <h3>💬 Message</h3>
                <p>{{message}}</p>
            </div>
            
            <div class="info-box">
                <h3>📋 Informations techniques</h3>
                <p><strong>Date:</strong> {{date}}</p>
                <p><strong>Répondre à:</strong> {{reply_to}}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>💒 Site de mariage Audrey & Stéphane - 16 août 2025</p>
            <p>Ce message a été envoyé automatiquement depuis le formulaire de contact</p>
        </div>
    </div>
</body>
</html>
```

### Template Texte Simple
```
Nouveau message depuis le site de mariage Audrey & Stéphane

👤 EXPÉDITEUR
Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

💬 MESSAGE
{{message}}

📧 RÉPONDRE À: {{reply_to}}

---
💒 Mariage Audrey & Stéphane - 16 août 2025
Message envoyé automatiquement depuis le formulaire de contact
```

## ⚙️ Configuration dans EmailJS Dashboard

### 1. Service Configuration
- Connectez votre service email (Gmail, Outlook, etc.)
- Utilisez le Service ID: `service_chyx9dc`

### 2. Template Configuration  
- Créez un nouveau template avec l'ID: `template_u2lfnee`
- Copiez le HTML ou le texte ci-dessus
- Configurez l'email de destination: `recovexpertconseillere@gmail.com`

### 3. Sécurité
- Ajoutez votre domaine dans les restrictions
- Limitez les requêtes par IP si nécessaire
- Activez la protection anti-spam

## 🧪 Test du Formulaire

### Variables Envoyées
Le formulaire React envoie ces données :
```javascript
{
  from_name: "Nom de l'utilisateur",
  from_email: "email@utilisateur.com", 
  subject: "Sujet sélectionné",
  message: "Message de l'utilisateur",
  to_email: "recovexpertconseillere@gmail.com",
  reply_to: "email@utilisateur.com"
}
```

### Sujets Disponibles
- Question sur la confirmation
- Transport et hébergement  
- Programme de la journée
- Liste de cadeaux
- Dress code
- Autre question

## 🔧 Dépannage

### Erreurs Communes
1. **CORS Error**: Vérifiez les restrictions de domaine
2. **Template Not Found**: Vérifiez l'ID du template
3. **Service Error**: Vérifiez la configuration du service email
4. **Rate Limit**: Respectez les limites d'envoi

### Logs
Les erreurs sont loggées dans la console du navigateur avec le préfixe `❌` ou `✅`.
