import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'configs',
  title: 'Configs',
  type: 'document',
  fields: [
    defineField({
      name: 'avatarsFemale',
      title: 'AvatarsFemale',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'avatarsMale',
      title: 'AvatarsMale',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
