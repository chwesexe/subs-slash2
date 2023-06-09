const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "abone-yetkili",
  description: "Abone Yetkili rolü ayarlarsın.",
  type: 1,
  options: [
      {
      name:"ayarla",
      description:"Abone Yetkili rolü seç.",
      type:8,
      required:true
}
  ],

  run: async(client, interaction) => {
let yetkili = await db.fetch(`aboneyetkilisi_${interaction.guild.id}`);
      
      
     const yetkinyok = new EmbedBuilder()
      .setDescription("Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın")
      .setColor("Red")
      
 if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})
      
      const aboneyetkili = interaction.options.getRole("ayarla")
      
      const rol = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone Yetkili rolü zaten ayarlanmış.`)
     if(yetkili) return interaction.reply({embeds: [rol], ephemeral: true})
     db.set(`aboneyetkilisi_${interaction.guild.id}`, aboneyetkili.id)
    
    const otorol = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`Abone Yetkilisi rolü ${aboneyetkili} olarak ayarlandı.`)
interaction.reply({embeds: [otorol]})

  }

};