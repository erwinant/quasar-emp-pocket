<template>
  <div class="row">
    <div class="col-12">
      <div class="text-h5">Profile Summary</div>
    </div>
    <div class="col-12 col-md-8">
      <div class="row ambience items-center">
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3 q-pl-lg">
          <q-img
            v-if="profile"
            :src="profilePic"
            spinner-color="red"
            style="height: 7.5rem; width: 7.5rem; border-radius:50%;"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center profilepic-section"
              style="height:2rem;padding:0;"
            >
              <image-uploader
                id="imgUpload"
                :preview="false"
                :className="['imgUpload', { 'imgUpload--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="file"
                @input="setImage"
                @onUpload="startUpload"
              >
                <label for="imgUpload" slot="upload-label">{{hasImage? 'wait...': 'change'}}</label>
              </image-uploader>
            </div>
          </q-img>
        </div>
        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-9">
          <div class="text-h6">Erwin Antonius</div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-8">
      <q-list bordered v-if="fields!=null">
        <ExpansionGroupForm
          @handle-change-expansion-group-form="handleChangExpansionGroupForm"
          v-for="field in groupedField"
          :key="field.key"
          :section="field.key"
          :fields="field.value"
        />
        <!-- custom for family, education, trainings-->
        <q-expansion-item
          group="exp-group"
          expand-separator
          :label="'Families'"
          header-class="bg-grey-1 text-primary text-bold"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <AbstractClientTable
                :data="profile.families"
                :columns="familyColumn"
                :title="'Member'"
                :rowKey="'name'"
                @handle-click-row="handleClickRow"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator/>
        <q-expansion-item
          group="exp-group"
          expand-separator
          :label="'Educations'"
          header-class="bg-grey-1 text-primary text-bold"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <AbstractClientTable
                :data="profile.educations"
                :columns="educationColumn"
                :title="''"
                :rowKey="'name'"
                @handle-click-row="handleClickRow"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator/>
        <q-expansion-item
          group="exp-group"
          expand-separator
          :label="'Trainings'"
          header-class="bg-grey-1 text-primary text-bold"
          expand-icon-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <AbstractClientTable
                :data="profile.trainings"
                :columns="trainingColumn"
                :title="'Collection'"
                :rowKey="'name'"
                @handle-click-row="handleClickRow"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import ExpansionGroupForm from "../../components/ExpansionGroupForm";
import AbstractClientTable from "../../components/AbstractClientTable";
import ProfileService from "../../services/profile.service";
import { FormHelper, CommonHelper } from "../../helper/Common";
import { mapState } from "vuex";
import { SHOW_ALERT } from "../../store/alert/action.type";
import ImageUploader from "vue-image-upload-resize";
export default {
  components: { ExpansionGroupForm, ImageUploader, AbstractClientTable },
  data() {
    return {
      fields: null,
      profile: null,
      hasImage: false,
      image: null,
      file: null,
      profilePic: null, //to concate with uri
      familyColumn: [
        { name: "fullName", label: "Name", field: "fullName", align: "left" },
        { name: "relation", label: "Relation", field: "relation" },
        { name: "birthDate", label: "Birth Date", field: "birthDate" }
      ],
      trainingColumn: [
        { name: "title", label: "Title", field: "title", align: "left" },
        { name: "institution", label: "Institution", field: "institution" },
        { name: "year", label: "Year", field: "year" }
      ],
      educationColumn: [
        { name: "degree", label: "Degree", field: "degree", align: "left" },
        { name: "institution", label: "Institution", field: "institution" },
        {
          name: "yearGraduation",
          label: "Year Graduate",
          field: "yearGraduation"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", { authData: ({ state }) => state.authData }),
    groupedField() {
      return CommonHelper.groupFunc(this.fields, "section");
    }
  },
  mounted() {
    //get field first
    ProfileService.fetchProfileField().then(field => {
      if (field.data) {
        //get value profile and bind it to field
        ProfileService.fetchProfile(this.authData.userName).then(({ data }) => {
          if (data) {
            this.profile = data;
            console.log(this.profile.families);
            this.profilePic = data.profilePic;
            this.fields = FormHelper.toFormField(data, field.data);
          }
        });
      }
    });
  },
  watch: {
    profilePic: {
      // deep: false,
      // immediate: true,
      handler: function() {
        if (this.profile.profilePic) {
          this.profilePic = `${this.$appConfig.$staticProfile}${
            this.authData.userName
          }/${this.profile.profilePic}`;
        } else {
          this.profilePic = `${
            this.$appConfig.$staticProfile
          }default-profile-pic.jpg`;
        }
      }
    }
  },
  methods: {
    startUpload() {
      this.hasImage = true;
    },
    setImage(fileOutput) {
      this.hasImage = true;
      this.image = fileOutput;
      let formData = new FormData();
      formData.append(this.authData.userName, this.image, this.image.name);
      ProfileService.uploadProfilePicture(
        this.authData.userName,
        formData
      ).then(({ data }) => {
        this.hasImage = false;
        this.image = null;
        this.profilePic = data.filename;
        this.profile.profilePic = data.filename;
        this.$store.dispatch(
          `alert/${SHOW_ALERT}`,
          {
            title: "Profile picture changed!",
            message: `You have set a profile picture!`,
            type: "positive"
          },
          { root: true }
        );
      });
    },
    handleChangExpansionGroupForm(eventValue) {
      let profile = FormHelper.toObject(eventValue);
      profile.userName = this.authData.userName;
      ProfileService.postProfile(profile).then(res => {
        this.$store.dispatch(
          `alert/${SHOW_ALERT}`,
          {
            title: "Data saved!",
            message: `${profile.userName} changed successed!`,
            type: "positive"
          },
          { root: true }
        );
      });
    },
    handleClickRow(ev, row) {
      console.log(row);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ #imgUpload {
  display: none;
}
.ambience {
  height: 150px;
  border-radius: 5px 5px 0px 0px;
  background: url("@~assets/images/bg-profile-light.jpg");
}
</style>